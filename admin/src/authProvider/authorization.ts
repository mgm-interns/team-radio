export namespace Authorization {
  export function isAdmin(permissions: Permissions): boolean {
    return permissions && permissions.some(role => role.role === Role.ADMIN);
  }

  export function isStationOwner(permissions: Permissions, id: string): boolean {
    return (
      permissions &&
      (isAdmin(permissions) ||
        permissions.some(({ role, stationId }) => role === Role.STATION_OWNER && stationId && stationId === id))
    );
  }

  export interface PermissionsProps {
    permissions: Permissions;
  }

  export type Permissions = UserRole[] | null;

  export interface UserRole {
    role: Role;
    stationId?: string;
  }

  export enum Role {
    ADMIN = 'admin',
    STATION_OWNER = 'stationOwner'
  }
}
