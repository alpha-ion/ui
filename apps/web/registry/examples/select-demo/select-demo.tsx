import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/registry/ui/select"

export default function SelectDemo() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Theme Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    Theme
                </label>
                <Select defaultValue="system">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    Language
                </label>
                <Select defaultValue="typescript">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Popular</SelectLabel>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="rust">Rust</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Others</SelectLabel>
                            <SelectItem value="go">Go</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Framework Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    Framework
                </label>
                <Select defaultValue="nextjs">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="nextjs">Next.js</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    Status
                </label>
                <Select defaultValue="active">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Region Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    Region
                </label>
                <Select defaultValue="us-east">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>United States</SelectLabel>
                            <SelectItem value="us-east">US East</SelectItem>
                            <SelectItem value="us-west">US West</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Europe</SelectLabel>
                            <SelectItem value="eu-west">EU West</SelectItem>
                            <SelectItem value="eu-central">EU Central</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Asia Pacific</SelectLabel>
                            <SelectItem value="ap-south">Asia Pacific South</SelectItem>
                            <SelectItem value="ap-northeast">Asia Pacific Northeast</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Priority Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    Priority
                </label>
                <Select defaultValue="medium">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
