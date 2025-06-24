"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function CardDemo({ title, description, image }: { title: string; description: string; image?: string; }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      {image && (
        <div className="my-4 w-full relative overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full"
          />
        </div>
      )}
      <CardDescription>
        {description}
      </CardDescription>
    </Card>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.05)] dark:bg-[rgba(40,40,40,0.30)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-2xl md:text-lg font-semibold text-gray-800 dark:text-white py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-base md:text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm text-center mx-auto",
        className
      )}
    >
      {children}
    </p>
  );
}; 