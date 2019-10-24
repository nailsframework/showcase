export class ShowcaseComponent {
    constructor(state) {
        this.selector = 'showcase';
    }

    render() {
        return `
        <div class="yield">
            <p>Hi, this is a template rendered with the router</p>
            {{whoami}}
        </div>`
            
    }
}