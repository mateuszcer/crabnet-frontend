class TimeUtils {


        calculatePublishedTime = (creationTime: string) => {
        return (Date.now() - Date.parse(creationTime))
    }

    formatPublishedTime = (creationTime: string) => {
        const timeInMin = Math.floor(this.calculatePublishedTime(creationTime)/(1000*60))
        if(timeInMin >= 2880) {
            return Math.floor(timeInMin/1440) + " days ago"
        }
        else if(timeInMin >= 1440) {
            return " day ago"
        }
        else if(timeInMin >= 120) {
            return Math.floor(timeInMin / 60) + " hours ago";
        }
        else if(timeInMin >= 60) {
            return " hour ago"
        }
        else if(timeInMin == 1) {
            return "minute ago"
        }
        else if(timeInMin == 0) {
            return "just now"
        }
        return timeInMin + " minutes ago"
    }

    compareObjectWithDate = (objA: {creationTime: string}, objB: {creationTime: string}) => {
        return (this.calculatePublishedTime(objA.creationTime) - this.calculatePublishedTime(objB.creationTime))
        
    }
} 

export default new TimeUtils()