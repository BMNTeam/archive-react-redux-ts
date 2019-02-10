declare namespace Models
{
    namespace Client {

        interface IEmployee {
            degree: string;
            full_name: string;
            id: number;
            position: string;
        }

        interface IJournal {
            name: string;
            id: number;
            url: string;
        }
        interface IArticle {
            id: number;
            name: string;
            authors: string[];
            journal: number;
            fullText: string;
            link: string;
        }
        interface INewReport extends ObjectConstructor {
            id?: number;
            date: string;
            employees: number[];
            full: File;
            manager: number;
            name: string;
            presentation: File;
            shortReport: File;
            themeNumber: string;
        }

        interface IReference {
            id?: number;
            date: string;
            employees: number[];
            manager: number;
            name: string;
            text: File;
            themeNumber: string;
        }
    }
    

    namespace Server {
        interface IReport {
            articles: IArticle[];
            date: string;
            employees: IEmployee[];
            id: string;
            manager: IEmployee;
            full_report_text: string;
            full_report_url: string;
            manager_id: string;
            name: string;
            presentation_url: string;
            short_report_text: string;
            short_report_url: string;
            theme_number: string;
        }

        interface IReference {
            articles: IArticle[];
            date: string;
            employees: IEmployee[];
            id: string;
            manager: IEmployee;
            name: string;
            text: string;
            theme_number: string;
            url: string;
        }
        
        interface IEmployee {
            id: number;
            degree: string;
            full_name: string;
            position: string;
        }

        interface IJournal {
            name: string;
            id: string;
            url: string;
        }

        interface IArticle {
            id: number;
            full_text: string;
            journal: IJournal;
            journal_id: number;
            link: string;
            name: string;
        }

    }

    
}

declare namespace Search
{
    import IEmployee = Models.Client.IEmployee;

    interface ISearchRequest {
        value: string;
        type?: ISearchDataType;

    }

    type ISearchDataType = "report" | "reference" | "all";
    interface ISearchData {
        authors: IEmployee[];
        text: string;
        id: number;
        name: string;
        type: ISearchDataType;
    }

    interface ISearchResult {
        error?: boolean;
        data: ISearchData[]
    }
}
