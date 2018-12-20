export interface IChanges {
    fileName: string;
    status: string;
}

export interface IImportConfig {
    path: string;
    changes: IChanges[];
}

export interface IFolderChange {
    fileName: string;
    status: string;
}
