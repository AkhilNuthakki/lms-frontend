

export class CourseRequest {

    name: string;
    duration: number;
    technology: string;
    description: string;
    launch_url: string;

    constructor(name: string, duration: number, technology: string, description: string, launchURL: string) {
        this.name = name;
        this.duration = duration;
        this.technology = technology;
        this.description = description;
        this.launch_url = launchURL;
        
    }
}