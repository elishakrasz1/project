import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-home"></i>}
            title="Dashboards"
        >
            <SidebarMenu.Item title="Analytics" to='/dashboards/analytics' exact />
            <SidebarMenu.Item title="Projects" to='/dashboards/projects' exact />
            <SidebarMenu.Item title="Questionnaire" to='/dashboards/questionnaire' exact />
            <SidebarMenu.Item title="System" to='/dashboards/system' exact />
            <SidebarMenu.Item title="Monitor" to='/dashboards/monitor' exact />
            <SidebarMenu.Item title="Financial" to='/dashboards/financial' exact />
            <SidebarMenu.Item title="Stock" to='/dashboards/stock' exact />
            <SidebarMenu.Item title="Reports" to='/dashboards/reports' exact />
        </SidebarMenu.Item>
        { /* -------- Forms ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-check-square-o"></i>}
            title="Forms"
        >
            <SidebarMenu.Item title="Forms" to='/forms/forms' />
            <SidebarMenu.Item title="Forms Layouts" to='/forms/forms-layouts' />
            <SidebarMenu.Item title="Input Groups" to='/forms/input-groups' />
            <SidebarMenu.Item title="Wizard" to='/forms/wizard' />
            <SidebarMenu.Item title="Text Mask" to='/forms/text-mask' />
            <SidebarMenu.Item title="Typeahead" to='/forms/typeahead' />
            <SidebarMenu.Item title="Toggles" to='/forms/toggles' />
            <SidebarMenu.Item title="Editor" to='/forms/editor' />
            <SidebarMenu.Item title="Date Picker" to='/forms/date-picker' />
            <SidebarMenu.Item title="Dropzone" to='/forms/dropzone' />
            <SidebarMenu.Item title="Sliders" to='/forms/sliders' />
        </SidebarMenu.Item>
       
    </SidebarMenu >
);
