import {createSignal, For} from "solid-js";
import {TimeLineComponent} from "~/components/TimeLineComponent";
import {Ticket} from "~/types/ITicketJSON";

function formatDuration(ms: number): string {
    let seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let result = '';

    if (hours > 0) {
        result += `${hours}h `;
    }
    if (minutes > 0 || hours > 0) { // 如果有小时数，即使分钟数为0，也显示
        result += `${minutes}m `;
    }
    result += `${seconds}s`;

    return result.trim();
}

const UserInfo = (props: any) => (
    <div class="flex items-center space-x-4">
        <div class="avatar">
            <div class="w-16 rounded-full">
                <img src={props.avatarUrl} alt={props.name}/>
            </div>
        </div>
        <div>
            <p class="text-sm text-gray-500">{props.role}</p>
            <p class="font-semibold">{props.name}</p>
        </div>
    </div>
);

// Subcomponent for displaying the duration, now styled for vertical layout
const ParameterInfo = (props: any) => (
    <div class="flex items-center space-x-2">
        <SvgIcon svg={props.svg}/>
        <div>
            <p class="text-sm text-gray-500">{props.label}</p>
            <p class="font-semibold">{props.value}</p>
        </div>
    </div>
);

const SvgIcon = (props: { svg: string }) => (
    <div class="svg-icon" innerHTML={props.svg}/>
);

export function InfoComponent(props: Omit<Ticket, 'conversation'>) {
    return (
        <div id="info" class="flex gap-4">
            <div class="p-4 w-full lg:w-1/3">
                <div class="card bordered shadow-lg rounded-lg h-full">
                    <div class="card-body flex flex-col justify-between">
                        <h2 class="card-title">工单历程</h2>
                        <TimeLineComponent {...props.timeline} />
                    </div>
                </div>
            </div>
            <div class="p-4 w-full lg:flex-1">
                <div class="card bordered shadow-lg rounded-lg h-full">
                    <div class="card-body flex flex-col justify-between">
                        <div
                            class="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-x-4 lg:space-y-0 overflow-x-auto">
                            <UserInfo
                                role="发起人"
                                name={props.participants[props.asker].name}
                                avatarUrl={props.participants[props.asker].avatarUrl}
                            />
                            <For each={Object.entries(props.participants)}>
                                {([id, participant]) => (
                                    id !== props.asker && (
                                        <UserInfo
                                            key={id}
                                            role="参与者"
                                            name={participant.name}
                                            avatarUrl={participant.avatarUrl}
                                        />
                                    )
                                )}
                            </For>
                        </div>
                        <div class="flex items-center space-x-3">
                            <ParameterInfo label="持续时长" value={formatDuration(Number(props.parameters.duration))}
                                           svg={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(159,207,248,1)"><path d="M6 4H4V2H20V4H18V6C18 7.61543 17.1838 8.91468 16.1561 9.97667C15.4532 10.703 14.598 11.372 13.7309 12C14.598 12.628 15.4532 13.297 16.1561 14.0233C17.1838 15.0853 18 16.3846 18 18V20H20V22H4V20H6V18C6 16.3846 6.81616 15.0853 7.8439 14.0233C8.54682 13.297 9.40202 12.628 10.2691 12C9.40202 11.372 8.54682 10.703 7.8439 9.97667C6.81616 8.91468 6 7.61543 6 6V4ZM8 4V6C8 6.68514 8.26026 7.33499 8.77131 8H15.2287C15.7397 7.33499 16 6.68514 16 6V4H8ZM12 13.2219C10.9548 13.9602 10.008 14.663 9.2811 15.4142C9.09008 15.6116 8.92007 15.8064 8.77131 16H15.2287C15.0799 15.8064 14.9099 15.6116 14.7189 15.4142C13.992 14.663 13.0452 13.9602 12 13.2219Z"></path></svg>`}/>
                            <ParameterInfo label="参与人数" value={Object.keys(props.participants).length}
                                           svg={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(70,146,221,1)"><path d="M9.55 11.5C8.30736 11.5 7.3 10.4926 7.3 9.25C7.3 8.00736 8.30736 7 9.55 7C10.7926 7 11.8 8.00736 11.8 9.25C11.8 10.4926 10.7926 11.5 9.55 11.5ZM10 19.748V16.4C10 15.9116 10.1442 15.4627 10.4041 15.0624C10.1087 15.0213 9.80681 15 9.5 15C7.93201 15 6.49369 15.5552 5.37091 16.4797C6.44909 18.0721 8.08593 19.2553 10 19.748ZM4.45286 14.66C5.86432 13.6168 7.61013 13 9.5 13C10.5435 13 11.5431 13.188 12.4667 13.5321C13.3447 13.1888 14.3924 13 15.5 13C17.1597 13 18.6849 13.4239 19.706 14.1563C19.8976 13.4703 20 12.7471 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 12.9325 4.15956 13.8278 4.45286 14.66ZM18.8794 16.0859C18.4862 15.5526 17.1708 15 15.5 15C13.4939 15 12 15.7967 12 16.4V20C14.9255 20 17.4843 18.4296 18.8794 16.0859ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM15.5 12.5C14.3954 12.5 13.5 11.6046 13.5 10.5C13.5 9.39543 14.3954 8.5 15.5 8.5C16.6046 8.5 17.5 9.39543 17.5 10.5C17.5 11.6046 16.6046 12.5 15.5 12.5Z"></path></svg>`}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
