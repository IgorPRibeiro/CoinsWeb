import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event' // Updated import

import SignUp from '../app/signup/page'

test('SignUp',async () => {
    render(<SignUp />)
    expect(screen.getByRole('heading',{level: 1, name: 'SignUp'})).toBeDefined()

    await userEvent.click(screen.getByText('Create Account'))

    const paragraphs = await screen.findAllByRole('paragraph')
    paragraphs.map(item => console.log(item.textContent))
    const hasExpectedText = paragraphs.some(p => p.textContent?.includes("This is not a valid email!"))
    expect(hasExpectedText).toBe(true)

})
