import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    @HostBinding('style.backgroundColor') backgroundColor: string = 'green';

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        // this.renderer.setStyle(
        //     this.elementRef.nativeElement,
        //     'background-color', 'green'
        // );
    }

    @HostListener('mouseenter') mouseover(evenData: Event){
        // this.renderer.setStyle(
        //     this.elementRef.nativeElement,
        //     'background-color', 'green'
        // );
        this.backgroundColor = 'green';
    }

    @HostListener('mouseleave') mouseleave(evenData: Event){
        // this.renderer.setStyle(
        //     this.elementRef.nativeElement,
        //     'background-color', 'transparent'
        // );
        this.backgroundColor = 'transparent';
    }
}