import { create } from "zustand";
import { PermissionStatus } from "../../../infrastructure/interfaces/permissions";
import { checkLocationPermission, requestLocationPermission } from "../../../actions/permissions/location";


interface PermissionState { 
    locationStatus: PermissionStatus

    requestLocationPermission: () => Promise<PermissionStatus>
    checkLocationPermission: () => Promise<PermissionStatus>
}

export const userPermissionStore = create<PermissionState>()( set => ({
    locationStatus: 'undetermined',

    requestLocationPermission: async () => {
        const status = await requestLocationPermission();

        set({ locationStatus: status });
        return status;
    },
    checkLocationPermission: async () => {
        const status = await checkLocationPermission();

        set({ locationStatus: status });
        return status;
    }
}) )