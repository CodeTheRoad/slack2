import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Workspace } from 'app/shared/model/workspace.model';
import { WorkspaceService } from './workspace.service';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceDetailComponent } from './workspace-detail.component';
import { WorkspaceUpdateComponent } from './workspace-update.component';
import { WorkspaceDeletePopupComponent } from './workspace-delete-dialog.component';
import { IWorkspace } from 'app/shared/model/workspace.model';

@Injectable({ providedIn: 'root' })
export class WorkspaceResolve implements Resolve<IWorkspace> {
    constructor(private service: WorkspaceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Workspace> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Workspace>) => response.ok),
                map((workspace: HttpResponse<Workspace>) => workspace.body)
            );
        }
        return of(new Workspace());
    }
}

export const workspaceRoute: Routes = [
    {
        path: 'workspace',
        component: WorkspaceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'slackApp.workspace.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'workspace/:id/view',
        component: WorkspaceDetailComponent,
        resolve: {
            workspace: WorkspaceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'slackApp.workspace.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'workspace/new',
        component: WorkspaceUpdateComponent,
        resolve: {
            workspace: WorkspaceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'slackApp.workspace.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'workspace/:id/edit',
        component: WorkspaceUpdateComponent,
        resolve: {
            workspace: WorkspaceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'slackApp.workspace.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workspacePopupRoute: Routes = [
    {
        path: 'workspace/:id/delete',
        component: WorkspaceDeletePopupComponent,
        resolve: {
            workspace: WorkspaceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'slackApp.workspace.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
