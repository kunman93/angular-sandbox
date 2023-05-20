import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color', 'green'
        );
    }

    @HostListener('mouseenter') mouseover(evenData: Event){
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color', 'green'
        );
    }

    @HostListener('mouseleave') mouseleave(evenData: Event){
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color', 'transparent'
        );
    }
}