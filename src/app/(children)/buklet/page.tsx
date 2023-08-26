"use client";
import { useWindowSize } from "@react-hook/window-size";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Document, pdfjs, Page as PdfPage } from "react-pdf";

import { cn } from "@/lib";

import workerSrc from "../../../../pdf-worker";
import { LoadingSpinner } from "../../../components/elements/LoadingSpinner";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function Page() {
  const [numPages, setNumPages] = useState<number>(0);

  const [pageNumber, setPageNumber] = useState(1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [width] = useWindowSize();

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {loadProgress < 100 ? (
          <></>
        ) : (
          <>
            <button
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="absolute inset-y-0 left-0 z-10 p-2 text-white transition-colors disabled:cursor-not-allowed hover:bg-black/60"
            >
              <ChevronLeft className="rounded-lg bg-black/40" />
            </button>
            <button
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="absolute inset-y-0 right-0 z-10 p-2 text-white transition-colors hover:bg-black/60"
            >
              <ChevronRight className="rounded-lg bg-black/40" />
            </button>
          </>
        )}

        <Document
          file="/buklet.pdf"
          onLoadSuccess={({ numPages: _numPages }) => setNumPages(_numPages)}
          onLoadProgress={({ loaded, total }) => {
            const load = Math.round((loaded / total) * 100);

            setLoadProgress(load);
          }}
          loading={<LoadingSpinner />}
        >
          {loadProgress < 100 && (
            <div
              className={cn("animate-pulse bg-gray-300")}
              style={{
                width: width > 800 ? 800 : width - 20,
                height: width > 800 ? 580 : 380,
              }}
            />
          )}
          <>
            {Array.from(new Array(numPages), (el, index) => (
              <PdfPage
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                // Display the page only if it matches the current page number
                className={cn(
                  pageNumber === index + 1 ? "visible" : "hidden",
                  loadProgress < 100 && "hidden",
                )}
                width={width > 800 ? 800 : width - 20}
              />
            ))}
          </>
        </Document>
      </div>
    </div>
  );
}
