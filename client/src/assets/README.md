
# Style Guide
## Introduction

This document provides guidelines for the visual presentation of our application. It outlines the use of colors, typography, and other key elements that ensure a consistent style across multiple pages.

## Importing Styles
For every less file, the first import should be a local address to style.less which is located in `[repo]/client/src/assets/style.less`. This document can be used for references to several colors (stored as #colors[type] in the file) and other objects that we will referring to in this document.

## Color Palette

Utilize the following primary colors defined in `style.less` to ensure brand consistency:

-   **Primary**: `#INSERT` (light blue)
-   **Secondary**: `#INSERT` (another shade of blue)
-   **Tertiary**: `#INSERT` (off-white)
-   **Quaternary**: `#INSERT` (yellow)
-   **Quinary**: `#INSERT` (golden yellow)
-   **Text-Primary**: `#INSERT` (dark grey for text)
-   **Text-Secondary**: `#INSERT` (white for text on dark backgrounds)

These colors should be consistently used for UI elements such as backgrounds, text, and buttons.

# Background

The background should be a light blue color (#colors[primary]). Should be the lowest layered value in the object.  It's a completely static object that should not change at any time.


# Text Boxes

The background for all text boxes will be white (#colors[INSERT LATER]) with the text color being black (#colors[INSERT LATER]).

## ABOUT Section:

### Title:

Label: "ABOUT CASMM", “HOW IT WORKS”, “OUR TEAM”.

Text Color: black at colors[INSERT].

Position: Top-center of the section.

### Logos:

Labels: "UF", "NSF", and "A&M" or None At All.

Design and Colors: Each logo has its distinct design and color scheme.

"UF" is written in blue.

"NSF" is surrounded by a gear design, primarily in blue and gold.

"A&M" is maroon with a white outline.

Position: Logos are arranged in a horizontal line, centrally positioned beneath the title.

### Text Description:

Content: Placeholder text is provided using "Lorem Ipsum". This text will be replaced with the actual content.

Text Color: black.

Position: Centrally positioned below the logos.

### Behavior:

Readability: Ensure that the text has adequate line spacing and letter spacing for better readability.

Length: Make sure the text isn't too lengthy, as lengthy content might overwhelm the viewer. If it is essential, consider integrating "read more" functionality.

Position on Page: Middle of the page, below the navigation bar.

# Buttons

## Primary

(submit/login button is primary, secondary would be like OK buttons)

### Student Login/Join/Teacher Login

Primary Button (ENTER):

Background Color: Yellow.

Text Color: Black.

Font: Appears to be possibly bolded.

Shape: Rounded rectangle with slightly rounded edges.

Behavior: Allows the user to login to their chasmm account after selecting their animal password.

## Secondary

### HELP Button

Background Color: The primary color of the button is a bright pink at color[INSERT].

Size and Shape: The button appears circular. Specify the diameter of the button?

#### Text:

Label: "HELP".

Text Color: Black.

Position: Centered within the button.

Capitalization: The label is in uppercase.

#### Behavior:

Hover: specify if there's any visual effect like a slight color change or a shadow when hovered?

Click: Specify any visual feedback when the button is clicked?

Position on Page: The button will be located on the bottom right corner of the home page.

### Featured Projects Section, Home Page

Background: The background color appears to be a light blue at color[INSERT].

#### Featured Projects Label:

Text Color: Black.

Position: Centered above the middle project card.

Capitalization: The label is in uppercase.

#### Project Cards:

Background Color: White.

Size: All cards seem to be of equal size. Should I provide specific size?

Spacing: There is equal spacing between each card. (Define the specific spacing?)

Rounded Corners: The cards seem to have rounded corners. (specify the radius?)

#### Behavior:

Hover: specify if there's any visual effect (like a shadow or a border) when hovered?

Click: Possibly if there's any visual feedback when a card is clicked, like a slight decrease in size (simulating a press effect) or a color change?

### FAQ Section

#### Title:

Label: "FAQ".

Text Color: Appears to be white.

Position: Top-center of the section.

#### Question Boxes:

Background Color: Light blue. As always, providing the exact color code ensures consistency.

Shape: Rectangular with possibly rounded corners (edges aren't completely sharp).

#### Text:

Label: Each box represents a question, labeled as "QUESTION 1", "QUESTION 2", and so on.

Text Color: Appears to be black.

Position: Center-left within each box.

#### Arrow Icon:

Shape and Design: A right-pointing chevron or arrow.

Color: Appears to be black.

Position: Center-right within each box.

#### Behavior:

Hover: a slight change in color or a shadow to indicate interactivity?

Click: When a question is clicked, it may expand to display the answer.

Spacing: Ensure consistent spacing between each question box for visual clarity.

Position on Page: Middle of the page, below the navigation bar.

## Close Button (Accessibility features)

Icon: An "X" symbol.

Color: Black.

Background: Grey.

Position: Top right corner.

## Accessibility Option Buttons

### Font Size Button:

#### Labels:

Color: Black.

Labels Used: "FONT SIZE."

#### Content Options:

Design: Horizontal toggles.

Options: "S", "M" (with a red circle indicator), and "L".

Color: Black.

Spacing: There's even spacing between the options.

### Language Button:

#### Labels:

Color: Black.

Labels Used: "LANGUAGE."

#### Content Options:

Design: Horizontal toggles.

Options: "EN" (with a pink indicator) and "SP".

Color: Black.

Spacing: There's even spacing between the options.

### Night Mode Button:

#### Labels:

Color: Black.

Labels Used: "NIGHT MODE."

#### Content Options:

Design: Horizontal toggles.

Options: "OFF" (with a pink indicator) and "ON".

Color: Black.

Spacing: There's even spacing between the options.

# Input Box

## Student Login Input Box

Background Color: White.

Border: Thin rounded pink border.

Text Color: Black.

Placeholder Text: The field name (e.g., "NAME") in uppercase.

### Student Landing Page Join Box

Background Color: White.

Border: Thin rounded pink border.

Text Color: Black.

Placeholder Text: The field name (e.g., "NAME")  in uppercase.

# Linked Text 

## Nav Bar Links (HOME, ABOUT, GALLERY, CREATE)

Background: It seems to have a white background.

Text Color: Black.

Spacing: There is equal spacing between each link name.

Capitalization: All links are in uppercase.

### Behavior:

Hover: (if the text changes color, underlines, or has any other effect when hovered.)

Click: (specify if there's any visual feedback when a link is clicked?)

# Fonts

(what will be primary font, highlighted font, etc)
All text in this document will be assumed to be in the font "KOULEN" unless stated otherwise. 

# Dropdown Menus 
### About Dropdown

Functionality: A user interface element designed to offer a list of options or links. When the user clicks or hovers over the primary label (in this instance, "About Dropdown"), the list expands downwards to display multiple related items.

Design: The dropdown menu has a clear heading, "About CASMM", which possibly indicates the main category or section. Beneath this heading, there are three distinct options listed vertically: "HOW IT WORKS", "OUR TEAM", and "FAQ". 

Font: Each option is presented in uppercase letters, in font “KOULEN”.

Interaction: Users can access the options within the dropdown by clicking on the main label. Once clicked, the list expands to present the available choices. After selecting or clicking elsewhere on the page, the dropdown menu retracts (I’m assuming it will?).

# Tiles

## Gallery

Background Color: Light blue. It's the overall backdrop for the sections.

### Sections:

 #### Labels:

Color: White.

Background: Lime green, pill-shaped background.

Labels Used: "CATEGORY," "RECENT," and "BOOKMARKS."

#### Content Blocks:

Background: Each section has a white rectangular background to demarcate its space.

#### Content Tiles:

Design: Square tiles.

Color: Yellow.

Content: Each tile is numbered sequentially from 1 to 5. The number font appears to be bold and dark-colored (possibly black).

Position: Tiles are aligned in a row under each respective label, maintaining uniform spacing between them.

Spacing: There's consistent spacing between each section (i.e., between "CATEGORY" and "RECENT", and between "RECENT" and "BOOKMARKS").