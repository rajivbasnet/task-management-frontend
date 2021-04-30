import Document, { DocumentContext, DocumentProps, Head, Main, NextScript, Html } from 'next/document';

export default class _Document extends Document{
    render() {
        return (
            <Html>
              <Head />
              <body>
                <Main />
                <NextScript />
              </body>
            </Html>
        )
    }
}