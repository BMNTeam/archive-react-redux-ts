interface IReport extends ObjectConstructor
{
    date: string;
    employees: number[];
    fullReport: File;
    manager: number;
    name: string;
    presentation: File;
    shortReport: File;
    themeNumber: string;
}