class AccordionComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="accordion-component">
      <button id="toggle-info">
      ${
        this.hasAttribute("title")
          ? `<h2>${this.getAttribute("title")}</h2>`
          : `<h2>untitled</h2>`
      }
        <svg
          class="arrow"
          width="23"
          height="13"
          viewBox="0 0 23 13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.540039 1.6527L1.24714 0.9456L11.5001 11.1986L21.7532 0.945599L22.4603 1.6527L11.5001 12.6128L0.540039 1.6527Z"
          />
        </svg>
      </button>
  
      <div class="text-container"><p>
      ${
        this.hasAttribute("paragraph")
          ? `${this.getAttribute("paragraph")}`
          : `no content`
      }
      ${
        this.hasAttribute("second-paragraph") && this.hasAttribute("paragraph")
          ? `</br></br>${this.getAttribute("second-paragraph")}`
          : ``
      }
      ${
        this.hasAttribute("third-paragraph") && this.hasAttribute("paragraph")
          ? `</br></br>${this.getAttribute("third-paragraph")}`
          : ``
      }</p>
      </div>
    </div>
    `;
  }

  // CLOSE ANIMATION
  closeAccordion() {
    const textContainer = this.querySelector(".text-container");
    const arrow = this.querySelector(".arrow");
    const paragraph = this.querySelector("p");

    paragraph.style.transform = "translateY(-20px)";
    paragraph.style.opacity = 0;
    textContainer.style.height = 0;
    arrow.style.transform = "rotate(0deg)";
  }

  // OPEN ANIMATION
  openAccordion() {
    const textContainer = this.querySelector(".text-container");
    const arrow = this.querySelector(".arrow");
    const paragraph = this.querySelector("p");

    paragraph.style.transform = "translateY(0)";
    paragraph.style.opacity = 1;
    textContainer.style.height = textContainer.scrollHeight + 25 + "px";
    arrow.style.transform = "rotate(180deg)";
  }

  // SET STYLE VALUES BASED ON ATTRIBUTE
  setState() {
    if (this.hasAttribute("open")) {
      this.openAccordion();
    } else {
      this.closeAccordion();
    }
  }

  // TOGGLE ATTRIBUTE
  toggleInfo() {
    this.toggleAttribute("open");
    this.setState();
  }

  // ON MOUNT
  connectedCallback() {
    // RESET COMPONENT HEIGHT ON WINDOW RESIZE
    if (this.hasAttribute("reload")) {
      let width = window.innerWidth;
      let timeOutFunctionId;

      const workAfterResizeIsDone = () => {
        this.openAccordion();
      };

      window.addEventListener("resize", () => {
        if (this.hasAttribute("open")) {
          if (window.innerWidth !== width) {
            clearTimeout(timeOutFunctionId);
            this.closeAccordion();
            timeOutFunctionId = setTimeout(workAfterResizeIsDone, 700);
            width = window.innerWidth;
          }
        }
      });
    }

    // SET STYLE VALUES
    this.setState();

    // TOGGLE EVENT LISTENER
    this.querySelector("#toggle-info").addEventListener("click", () =>
      this.toggleInfo()
    );
  }

  // ON DISMOUNT
  disconnectedCallback() {
    this.querySelector("#toggle-info").removeEventListener();
    window.removeEventListener();
  }
}

window.customElements.define("accordion-component", AccordionComponent);
