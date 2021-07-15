import { NewsFeed, NewsDetail } from '../types';

export class Api {
    url: string;
    ajax: XMLHttpRequest;
    constructor(url: string) {
        this.url = url;
        this.ajax = new XMLHttpRequest();
    }

    protected getRequest<AjaxResponse>(cd: (data: AjaxResponse) => void): void {
        this.ajax.open('GET', this.url);
        this.ajax.addEventListener('load', () => {
            cd(JSON.parse(this.ajax.response) as AjaxResponse);
        })
        this.ajax.send();
    }
}

export class NewsFeedApi extends Api {
    constructor(url: string) {
        super(url);
    }

    getData(cd: (data: NewsFeed[]) => void): void {
        return this.getRequest<NewsFeed[]>(cd);
    }
}

export class NewsDetailApi extends Api {
    constructor(url: string) {
        super(url);
    }

    getData(cd: (data: NewsDetail) => void): void {
        return this.getRequest<NewsDetail>(cd);
    }
}
