import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';

export default class GoogleDriveService {
    constructor(config = {}) {
        this.scopes = config.scopes || ['https://www.googleapis.com/auth/drive.file'];
        this.iosClientId = IOS_CLIENT_ID;
        this.webClientId = WEB_CLIENT_ID;
        this.offlineAccess = config.offlineAccess || true;
        this.FOLDER_MIMETYPE = 'application/vnd.google-apps.folder';

        this.initGoogleSignin();
    }

    async initGoogleSignin() {
        GoogleSignin.configure({
            scopes: this.scopes,
            iosClientId: this.iosClientId,
            webClientId: this.webClientId,
            offlineAccess: this.offlineAccess,
        });
    }

    async signinExplicitly() {
        try {
            if (GoogleSignin.hasPreviousSignIn()) {
                GoogleSignin.signOut();
            }

            await GoogleSignin.hasPlayServices();
            return isSuccessResponse(await GoogleSignin.signIn());
        } catch (error) {
            console.error('Google login error:', error);
            return false;
        }
    }

    async getAccessToken() {
        try {
            if (!GoogleSignin.hasPreviousSignIn()) {
                throw new Error('구글 로그인이 필요합니다. signinExplicitly()를 호출해주세요.');
            }
            if (GoogleSignin.getCurrentUser() == null) {
                this.initGoogleSignin();
                GoogleSignin.signInSilently();
            }

            const tokens = await GoogleSignin.getTokens();
            return tokens.accessToken;

        } catch (error) {
            throw new Error('액세스 토큰을 가져오는 중 오류가 발생했습니다' + error.message);
        }
    }

    async listFiles() {
        try {
            const response = await fetch('https://www.googleapis.com/drive/v3/files', {
                headers: {
                    Authorization: `Bearer ${await this.getAccessToken()}`,
                },
            });
            const data = await response.json();
            const list = data.files.reduce((acc, file) => {
                if (file.mimeType === this.FOLDER_MIMETYPE) {
                    if (!acc.folders) {
                        acc.folders = [];
                    }
                    acc.folders.push({name: file.name, id: file.id});
                    return acc;
                }

                if (!acc.files) {
                    acc.files = [];
                }
                acc.files.push({name: file.name, id: file.id});
                return acc;
            }, {});
            return list;
        } catch (error) {
            console.error('Error listing files:', error);
            throw error;
        }
    }

    async createFolder(folderName) {
        const metadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
        };

        try {
            const response = await fetch('https://www.googleapis.com/drive/v3/files', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${await this.getAccessToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(metadata),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Folder created successfully:', data);
                return data.id;
            } else {
                const errorData = await response.json();
                throw new Error('Error creating folder: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    }

    async deleteFolder(folderId) {
        this.deleteFile(folderId);
    }

    async createFile(folderId, fileName, fileContent) {
        const metadata = {
            name: fileName,
            mimeType: 'text/plain',
            parents: [folderId],
        };

        const boundary = 'foo_bar_baz';
        const delimiter = `--${boundary}`;
        const closeDelimiter = `--${boundary}--`;

        const body = [
            delimiter,
            'Content-Type: application/json; charset=UTF-8',
            '',
            JSON.stringify(metadata),
            delimiter,
            'Content-Type: text/plain',
            '',
            fileContent,
            closeDelimiter,
        ].join('\r\n');

        try {
            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${await this.getAccessToken()}`,
                    'Content-Type': `multipart/related; boundary=${boundary}`,
                },
                body: body,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File created successfully:', data);
                return data.id;
            } else {
                const errorData = await response.json();
                throw new Error('Error creating file: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${await this.getAccessToken()}`,
                },
            });

            if (response.ok) {
                console.log('File deleted successfully');
            } else {
                const errorData = await response.json();
                throw new Error('Error deleting file:', JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    }

    async getFileContent(fileId) {
        try {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                headers: {
                    Authorization: `Bearer ${await this.getAccessToken()}`,
                },
            });

            if (response.ok) {
                const fileContent = await response.text();
                return fileContent;
            } else {
                const errorData = await response.json();
                throw new Error('Error downloading file: ' + JSON.stringify(errorData));
            }
        }
        catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    }
}
