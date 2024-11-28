describe('HomePage Tests', () => {
    // Test Case 1: Verify Page Elements Render Correctly
    it('should render the heading, description, and button', () => {
        cy.visit('/'); // Navigate to the HomePage

        // Check if the heading is displayed
        cy.contains('Welcome to Quiz App').should('be.visible');

        // Check if the description is displayed
        cy.contains(
            'Test your knowledge and challenge yourself with our exciting quiz questions!'
        ).should('be.visible');

        // Check if the button is displayed
        cy.contains('Start Quiz').should('be.visible');
    });

    // Test Case 2: Verify Button Click Navigates to Register Page
    it('should navigate to /register on button click', () => {
        cy.visit('/'); // Navigate to the HomePage

        // Click the "Start Quiz" button
        cy.contains('Start Quiz').click();

        // Verify the URL is updated to /register
        cy.url().should('include', '/register');
    });

    // Test Case 3: Verify Accessibility of the Button
    it('should have an accessible button', () => {
        cy.visit('/');

        // Check if the button is accessible by role
        cy.get('button').should('have.text', 'Start Quiz').and('be.visible');

        // Verify the button is clickable
        cy.get('button').click();
    });

    // Test Case 4: Verify Page Layout and Styling
    it('should have the correct layout and styling', () => {
        cy.visit('/');

        // Verify the root container has the expected styling classes
        cy.get('div.min-h-screen')
            .should('have.class', 'bg-gradient-to-br')
            .and('have.class', 'flex')
            .and('have.class', 'items-center')
            .and('have.class', 'justify-center');
    });

    // Test Case 5: Verify Responsive Design
    const viewports = ['iphone-6', 'ipad-2', 'macbook-15'];
    viewports.forEach((viewport) => {
        it(`should render correctly on ${viewport}`, () => {
            cy.viewport(viewport); // Set the viewport
            cy.visit('/');

            // Verify the heading, description, and button are visible
            cy.contains('Welcome to Quiz App').should('be.visible');
            cy.contains(
                'Test your knowledge and challenge yourself with our exciting quiz questions!'
            ).should('be.visible');
            cy.contains('Start Quiz').should('be.visible');
        });
    });

    // Test Case 6: Ensure Button Navigates to Register Page Only Once
    it('should navigate to /register only once even after multiple clicks', () => {
        cy.visit('/');

        // Click the button multiple times
        cy.contains('Start Quiz').click().click().click();

        // Verify the URL is still /register
        cy.url().should('include', '/register');
    });
});
