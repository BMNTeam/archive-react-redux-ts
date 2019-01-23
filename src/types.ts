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
    }
    

    namespace Server {
        interface IReport {
            articles: IArticle[];
            date: string;
            employees: IEmployee[];
            id: string;
            full_report_text: string;
            full_report_url: string;
            manager_id: string;
            name: string;
            presentation_url: string;
            short_report_text: string;
            short_report_url: string;
            theme_number: string;
        }
        
        interface IEmployee {
            id: number;
            degree: string;
            full_name: string;
            position: string;
        }

        interface IArticle {
            id: number;
            full_text: string;
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
        type: 'report' | 'reference';

    }

    type ISearchDataType = "report" | "reference";
    interface ISearchData {
        authors: IEmployee[];
        short_report_text: string;
        id: number;
        name: string;
        type: ISearchDataType;
    }

    interface ISearchResult {
        error?: boolean;
        data: ISearchData[]
    }
}
