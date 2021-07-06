export default abstract class View {
    private template: string;
    private renderTemplate: string;
    private container: HTMLElement;
    private htmlList: string[];

    constructor(containerId: string, template: string) {
        const containerElement = document.getElementById(containerId);

        if (!containerElement) {
            throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.';
        }

        this.container = containerElement;
        this.template = template;
        this.renderTemplate = template;
        this.htmlList = [];
    }

    protected updateView(): void {
        this.container.innerHTML = this.renderTemplate;
        this.renderTemplate = this.template;
    }

    protected addHtml(htmlString: string): void {
        this.htmlList.push(htmlString);
    }

    protected getHtml(): string {
        const snapshot = this.htmlList.join('');
        this.clearHtmlList();
        return snapshot;
    }

    protected setTemplateData(key: string, value: string): void {
        this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }

    private clearHtmlList(): void {
        this.htmlList = [];
    }

    // render : view를 업데이트를 시킨다는 공통적인 이름
    // 자식들은 강제적으로 render를 명시해야 한다고 시킬 수 있다.
    // View class를 상속 받으면 의무적으로 render를 구현해야한다.
    // ==> abstract 추상 메소드
    abstract render(): void;
}
