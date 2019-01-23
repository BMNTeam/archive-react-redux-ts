import axious from "axios";
import {env} from "../../../env";

export class AdminService
{
   public async getEmployeesOptions()
   {
       const employees = await this.getData<Models.Client.IEmployee>(env.endpoints.employees);
       return employees.map(e => this.getOptions(e.id, e.full_name))
   }

   public async getJournalsOptions()
   {
       const journals = await this.getData<Models.Client.IJournal>(env.endpoints.journals);
       return journals.map(j => this.getOptions(j.id, j.name));
   }

   public async getArticleOptions()
   {
       const articles = await this.getData<Models.Client.IArticle>(env.endpoints.articles);
       return articles.map(j => this.getOptions(j.id, j.name));
   }

   private async getData<T>(action: string): Promise<T[]>
   {
       const res =  await axious.get<T[]>(`${env.url}${action}`);
       return res.data;
   }

   private getOptions = (value: number, label: string) => ({value, label});
}