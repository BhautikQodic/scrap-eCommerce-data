import styled from "styled-components";

/**
 * A styled container component that centers its content and sets a maximum width.
 * 
 * @constant
 * @type {StyledComponent<'div', any>}
 * @default
 * max-width: 1200px;
 * margin: 0 auto;
 */
export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

/**
 * A styled `div` component representing the header section.
 * 
 * This component has the following styles:
 * - `background-color`: white
 * - `padding`: 20px
 * - `border-radius`: 12px
 * - `margin-bottom`: 20px
 * - `box-shadow`: 0 2px 4px rgba(0, 0, 0, 0.05)
 * 
 * @component
 */
export const Header = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

/**
 * A styled div component that serves as the header content.
 * 
 * This component uses flexbox to arrange its children elements.
 * - `display: flex`: Enables flexbox layout.
 * - `justify-content: space-between`: Distributes space between items evenly.
 * - `align-items: center`: Aligns items vertically centered.
 * - `margin-bottom: 20px`: Adds a bottom margin of 20px.
 */
export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

/**
 * A styled H1 component with specific font size, color, and weight.
 * 
 * @constant
 * @type {StyledComponent<'h1', any, {}, never>}
 * @default
 * @example
 * <H1>This is a heading</H1>
 */
export const H1 = styled.h1`
    font-size: 24px;
    color: #1a1a1a;
    font-weight: 600;
`

/**
 * A styled component that wraps a table with a white background, rounded corners,
 * hidden overflow, and a subtle box shadow. On screens with a maximum width of 1024px,
 * it allows horizontal scrolling.
 */
export const TableWrapper = styled.div`
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    @media (max-width: 1024px) {
        overflow-x: auto;
    }
`

/**
 * A styled table component with responsive design.
 * 
 * The table takes up 100% of the width of its container and has collapsed borders.
 * 
 * @media (max-width: 1024px) - For screens with a maximum width of 1024px, the table has a minimum width of 900px.
 */
export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    @media (max-width: 1024px) {
        min-width: 900px;
    }
`

/**
 * A styled table cell component (`<td>`) with custom styles.
 * 
 * This component applies the following styles:
 * - Padding: 15px
 * - Text alignment: Left
 * - Border bottom: 1px solid #e1e1e1
 * 
 * Usage:
 * ```tsx
 * <Td>Content</Td>
 * ```
 */
export const Td = styled.td`
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #e1e1e1;
`

/**
 * A styled table header (`<th>`) component with custom styles.
 * 
 * Styles applied:
 * - `background-color`: Light grey background color (`#f8f9fa`).
 * - `font-weight`: Bold font weight (`600`).
 * - `color`: Dark grey text color (`#666`).
 * - `font-size`: Small font size (`14px`).
 * - `text-transform`: Uppercase text transformation.
 * - `letter-spacing`: Slightly increased letter spacing (`0.5px`).
 * - `white-space`: Prevents text from wrapping (`nowrap`).
 */
export const Th = styled.th`
    background-color: #f8f9fa;
    font-weight: 600;
    color: #666;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
`