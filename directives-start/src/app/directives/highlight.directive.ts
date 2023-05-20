import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    @Input() defaultColor: string;
    @Input() highlightColor: string;
    @HostBinding('style.backgroundColor') backgroundColor: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() { 
        this.backgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter') mouseover(evenData: Event){
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') mouseleave(evenData: Event){
        this.backgroundColor = this.defaultColor;
    }
}