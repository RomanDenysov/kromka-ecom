import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";

export function FormWrapper(props: { title: string; children: ReactNode }) {
    const { title, children } = props
    return (
        <Card className="border-none bg-accent">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}