import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';

const classes = ["show", "open"];

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit {
  private ulElement: HTMLDivElement;
  isOpen = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  @HostListener('click') onClick() {
    this.toggleClass();
  }

  toggleClass() {
    this.isOpen
      ? this.hide()
      : this.show();

    this.isOpen = !this.isOpen;
  }

  private show() {
    classes.forEach(className => this.renderer.addClass(this.ulElement, className))
  }

  private hide() {
    classes.forEach(className => this.renderer.removeClass(this.ulElement, className))
  }

  ngAfterViewInit(): void {
    this.ulElement = this.el.nativeElement.getElementsByTagName("ul")[0];
    this.renderer.setStyle(this.ulElement, "position", "absolute");
    this.renderer.setStyle(this.ulElement, "inset", "0px 0px auto auto");
    this.renderer.setStyle(this.ulElement, "margin", "0px");
    this.renderer.setStyle(this.ulElement, "transform", "translate(0px, 40px)");
  }
}
