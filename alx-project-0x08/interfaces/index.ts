import * as React from "react"

export interface ReactComponentProps {
    children: React.ReactNode
}

export interface GeneratedImageProps {
    imageUrl: string;
    prompt: string;
    width?: number;
    action: (url: string) => void;
}

export interface ImageProps {
    imageUrl: string;
    prompt: string;
}