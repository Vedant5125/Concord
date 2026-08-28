const registry = new Map<number, any>();

export function isPortInMap(port :number):boolean{
    return registry.has(port);
}

export function newPortRegister(port :number, server:any){
    return registry.set(port, server);
}

// export function deletePort(port: number){
//     registry.delete(port);
// }