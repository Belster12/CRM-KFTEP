import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { createClient } from '@/lib/server'
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"



export default async function Page() {
  const supabase = await createClient()

  const { data: students } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: true })

  const tasks =
  students?.map((student, index) => ({
    id: student.id ?? index + 1,
    title: student.name ?? "Unnamed student",
    priority: "medium",
    status:
      student.status === "active"
        ? "in_progress"
        : student.status === "finished"
        ? "done"
        : "todo",
    estimate: "4",
    assignee: student.email ?? "Unassigned",
  })) || []


  const totalStudents = students?.length || 0

  const activeStudents =
    students?.filter(
      (student) => student.status === 'active'
    ).length || 0

  const finishedStudents =
    students?.filter(
      (student) => student.status === 'finished'
    ).length || 0

  const currentMonth = new Date().getMonth()

  const newStudents =
    students?.filter((student) => {
      const createdAt = new Date(student.created_at)

      return createdAt.getMonth() === currentMonth
    }).length || 0
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards
              totalStudents={totalStudents}
              activeStudents={activeStudents}
              finishedStudents={finishedStudents}
              newStudents={newStudents}
            />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive 
               students={students || []}/>
            </div>
            
          </div>
        </div>
      </div>
    </>

  )
}
