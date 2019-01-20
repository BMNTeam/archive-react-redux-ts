declare namespace Models
{
    interface IArticle {
        id: number;
        name: string;
        authors: string[];
        journal: number;
        fullText: string;
        link: string;
    }
    interface IReport extends ObjectConstructor {
        id?: number;
        date: string;
        employees: number[];
        fullReport: File;
        manager: number;
        name: string;
        presentation: File;
        shortReport: File;
        themeNumber: string;
    }

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
}

declare namespace Search
{
    import IEmployee = Models.IEmployee;

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
