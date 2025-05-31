import React, { PropsWithChildren } from 'react'

interface Props {
    className?: string;
}

export default function SectionContainer({ children, className }: PropsWithChildren<Props>) {
    return (
        <section className={`p-12 ${className ? ` ${className}` : ''}`}>
            {children}
        </section>
    )
}
