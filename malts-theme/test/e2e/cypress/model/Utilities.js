// This class is used to store functions that can be reused
class Utilities {
  // function gets texts from elements and stores in a text file
  static getElementsTextAndStoreInFile(xpath, fileName) {
    const arrayName = [];
    // Verify tab names are displayed correct
    cy.xpath(xpath)
      .then(($element) => {
        const count = $element.length;
        cy.log(`element count is ${count}`);
        let i;
        for (i = 0; i < $element.length; i += 1) {
          cy.wrap($element[i])
            .should('be.visible');
          const text = $element[i].innerText;
          arrayName.push(text);
        }
        cy.log(`Tabs displayed are: ${arrayName}`);
        cy.writeFile(`cypress/fixtures/${fileName}`, arrayName.toString());
      });
    return fileName;
  }

  static isElementDisplayedInWindow(xpath) {
    cy.xpath(xpath).should('be.visible').then(($element) => {
      const element = $element[0].getBoundingClientRect();
      cy.log(`The element top  is ${element.top}`);
      cy.log(`The element bottom is ${element.bottom}`);
      assert(element.top >= 0 && element.bottom >= 0, 'Element is displayed in window');
    });
  }

  static roundAccurately(number, decimalPlaces) {
    return Number(`${Math.round(`${number}e+${decimalPlaces}`)}e-${decimalPlaces}`);
  }

  // Function to generate random number
  static randomGenerator(number) {
    this.randomNumber = Math.round(Math.random() * (number - 1));
    return this.randomNumber;
  }

  static doElementsOverlap(xpath1, xpath2) {
    // Get location of first element
    cy.xpath(xpath1).then(($element1) => {
      const element1Location = $element1[0].getBoundingClientRect();
      // Get second element location
      cy.xpath(xpath2).then(($element2) => {
        const element2Location = $element2[0].getBoundingClientRect();
        cy.log(`element 1 right is ${element1Location.right} while element 2  left is ${element2Location.left}`);
        cy.log(`element 1 left is ${element1Location.left} while element 2  right is ${element2Location.right}`);
        cy.log(`element 1 bottom is ${element1Location.bottom} while element 2  top is ${element2Location.top}`);
        cy.log(`element 1 top is ${element1Location.top} while element 2  bottom is ${element2Location.bottom}`);

        // Check if buttons are aligned horizontally
        if (element1Location.bottom === element2Location.bottom) {
          assert(element1Location.right < element2Location.left, 'elements do not overlap horizontally');
        }

        // Check if buttons are aligned vertically
        if (element1Location.left === element2Location.left) {
          assert(element1Location.bottom < element2Location.top, 'elements do not overlap vertically');
        }
      });
    });
  }
}
export default Utilities;
