import React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string
}

export const Facebook = ({ size = 24, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
)

export const Instagram = ({ size = 24, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
)

export const Linkedin = ({ size = 24, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
)

export const Twitter = ({ size = 24, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
)

export const Youtube = ({ size = 24, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
)

export const Whatsapp = ({ size = 24, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        {/* Speech bubble with tail */}
        <path d="M12 2C6.48 2 2 6.26 2 11.5c0 2.92 1.45 5.52 3.72 7.24L5 22l3.18-1.66C9.39 20.77 10.67 21 12 21c5.52 0 10-4.26 10-9.5S17.52 2 12 2z" />
        {/* Phone handset */}
        <path d="M8.5 9.5c-.2-.8.4-1.8 1.2-1.8l1 .2c.4.2.4.8.2 1.2l-.8 1.4c.3.5.7.9 1.1 1.3.4.4.8.8 1.3 1.1l1.4-.8c.4-.2 1-.2 1.2.2l.2 1c.2.8-.8 1.4-1.6 1.2-2.2-.6-3.6-2-4-4z" />
    </svg>
)

// Filled variant
export const WhatsappFilled = ({ size = 24, color = "#25D366", ...props }: IconProps & { color?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <path
            d="M12 2C6.48 2 2 6.26 2 11.5c0 2.92 1.45 5.52 3.72 7.24L5 22l3.18-1.66C9.39 20.77 10.67 21 12 21c5.52 0 10-4.26 10-9.5S17.52 2 12 2z"
            fill={color}
        />
        <path
            d="M8.5 9.5c-.2-.8.4-1.8 1.2-1.8l1 .2c.4.2.4.8.2 1.2l-.8 1.4c.3.5.7.9 1.1 1.3.4.4.8.8 1.3 1.1l1.4-.8c.4-.2 1-.2 1.2.2l.2 1c.2.8-.8 1.4-1.6 1.2-2.2-.6-3.6-2-4-4z"
            fill="white"
        />
    </svg>
)