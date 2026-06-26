"use client"

import { useState, useEffect } from "react"

import { Course, coursesData } from "@/data/courses"

export function useCourse(id: string) {
    const course = coursesData[id] || null
    return { course, loading: false }
}

export function useCourses() {
    const courses = Object.values(coursesData)
    return { courses, loading: false }
}
