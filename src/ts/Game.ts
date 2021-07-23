import {Text, Application, Container, Ticker, TextStyle} from 'pixi.js';
export class Game {
    private stage: Container;
    private fps:Text;
    private message:Text;
    private app: Application;
    constructor(app:Application) {
        this.app = app;
        this.stage = app.stage;
        const messageTextStyle = new TextStyle({
            fontSize:'28px',
            fontFamily:'Comic Sans',
            fill:'blue',
            align: 'center'
        });
        const fpsTextStyle = new TextStyle({
            fontSize:'12px',
            fontFamily:'Comic Sans',
            fill:'blue'
        });
        this.message = this.createText("Hello World of Pixi!!", messageTextStyle, 0, 20);
        this.fps = this.createText('', fpsTextStyle, 3, 0);
    }
    private createText(text: string, style:TextStyle, x: number, y: number):Text{
        const txt = new Text(text, style);
        txt.position.set(x, y);
        this.stage.addChild(txt);
        return txt;
    }

    public update():void {
        this.fps.text = Ticker.shared.FPS.toFixed(2);
        this.message.x += 1 ;
        if(this.message.x > this.app.view.width) {
            this.message.x = -this.message.width;
        }
    }
}