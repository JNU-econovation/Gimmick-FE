

import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleDriveService from './GoogleDriveService';
import { checkUserType } from './CheckUserType';

const GOOGLE_DRIVE_FOLDER_NAME = 'CookTime';
const GOOGLE_DRIVE_FILE_NAME = 'data.json';

class AppDataStorage {
    constructor() {
        if (!AppDataStorage.instance) {
            AppDataStorage.instance = this;
            this.googleapi = {
                initComplete: false,
            };
        }
        return AppDataStorage.instance;
    }

    async isGoogleUser() {
        return await checkUserType() === 'google';
    }

    async initGoogleFolderId(folders) {
        const folder = folders.find(f => f.name === GOOGLE_DRIVE_FOLDER_NAME);
        if (folder) {
            return folder.id;
        }
        return await this.googleapi.service.createFolder(GOOGLE_DRIVE_FOLDER_NAME);
    }

    async initGoogleFileId(files) {
        const file = files.find(f => f.name === GOOGLE_DRIVE_FILE_NAME);
        if (file) {
            return file.id;
        }
        return await this.googleapi.service.createFile(this.googleapi.folderId, GOOGLE_DRIVE_FILE_NAME, '{}');
    }

    async initGoogleDriveEnvironment() {
        try {
            this.googleapi.service = new GoogleDriveService();

            const fileList = await this.googleapi.service.listFiles();
            this.googleapi.folderId = await this.initGoogleFolderId(fileList.folders);
            this.googleapi.fileId = await this.initGoogleFileId(fileList.files);
            this.googleapi.initComplete = true;
        }
        catch (error) {
            console.error('Error initializing Google Drive environment:', error);
        }
    }

    async getGoogleDriveService() {
        if (!this.googleapi.initComplete) {
            this.initGoogleDriveEnvironment();
            return null;
        }
        return this.googleapi.service;
    }

    async save(key, value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            if (this.isGoogleUser()) {
                this.save_google(key, value);
            }
        }
        catch (error) {
            console.error('Error saving data:', error);
        }
    }

    async save_google(key, value) {
        const service = await this.getGoogleDriveService();
        if (!service) {
            console.log('Google Drive service not ready');
            return;
        }
        const data = JSON.parse(await service.getFileContent(this.googleapi.fileId));
        data[key] = value;
        await service.updateFile(this.googleapi.fileId, JSON.stringify(data, null, 2));
    }

    async load(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        }
        catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }
}

const instance = new AppDataStorage();
Object.freeze(instance);

export default instance;
