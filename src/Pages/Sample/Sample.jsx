import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import './Sample.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';
import resume from '../../Assets/pdf/resume.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// import 'react-pdf/dist/esm/Page/TextLayer.css';


const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

export default function Sample() {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    return (
        <div className="Example">
            <div className="Example__container">
                <div className="Example__container__load">
                </div>
                <div className="Example__container__document">
                    <Document file={resume} renderMode={'svg'} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                        {/*{Array.from(new Array(numPages), (el, index) => (*/}
                        {/*    // <Page scale={1.5} key={`page_${index + 1}`} pageNumber={index + 1} />*/}
                        {/*))}*/}
                    </Document>
                </div>
            </div>
        </div>
    );
}