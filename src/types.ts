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
