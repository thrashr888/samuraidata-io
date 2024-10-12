'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Database, FileText, Users, Home, Settings, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"

export function DashboardHomeComponent() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-gray-100 p-4 flex flex-col">
        <div className="flex items-center space-x-2 mb-6">
          <Database className="h-6 w-6" />
          <span className="font-bold text-lg">CMS Dashboard</span>
        </div>
        <nav className="space-y-2 flex-1">
          <Link href="/dashboard" className="flex items-center space-x-2 p-2 bg-gray-200 rounded">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/datasets" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <Database className="h-5 w-5" />
            <span>Datasets</span>
          </Link>
          <Link href="/annotations" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <FileText className="h-5 w-5" />
            <span>Annotations</span>
          </Link>
          <Link href="/users" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <Users className="h-5 w-5" />
            <span>Users</span>
          </Link>
          <Link href="/analytics" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
        </nav>
        <div className="space-y-2">
          <Link href="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <Link href="/help" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </Link>
          <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Logout clicked")}>
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Input className="w-64" placeholder="Search datasets..." type="search" />
            <Button size="sm" variant="ghost">
              John Doe
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Annotations</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+123 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">HuggingFace Syncs</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">+2 successful syncs today</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Datasets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "LLM Training Data",
                      "RAG Knowledge Base",
                      "Entity Recognition Corpus",
                      "Sentiment Analysis Dataset",
                    ].map((dataset) => (
                      <div key={dataset} className="flex items-center">
                        <Database className="mr-2 h-4 w-4" />
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{dataset}</p>
                          <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
                        </div>
                        <div className="ml-auto font-medium">200 entries</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your datasets and annotations</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Button className="w-full" asChild>
                    <Link href="/datasets/new">Create New Dataset</Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/annotations">Start Annotating</Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/api-docs">View API Documentation</Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/huggingface">Sync with HuggingFace</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="datasets">Datasets</TabsTrigger>
                    <TabsTrigger value="annotations">Annotations</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4">
                    <div className="flex items-center">
                      <Database className="mr-2 h-4 w-4" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">New dataset created: "Customer Support Queries"</p>
                        <p className="text-sm text-muted-foreground">By John Doe, 1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">100 new annotations added to "Product Reviews"</p>
                        <p className="text-sm text-muted-foreground">By Annotation Team, 3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">New user joined: Alice Johnson</p>
                        <p className="text-sm text-muted-foreground">Role: Contributor, 5 hours ago</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}