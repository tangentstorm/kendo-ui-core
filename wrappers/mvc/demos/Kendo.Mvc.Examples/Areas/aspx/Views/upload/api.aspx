﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="box">
    <h4>API Functions</h4>
    <ul class="options">
        <li>
            <button class="toggleEnabled k-button">Toggle enabled state</button>
        </li>
        <li>
            <button class="enable k-button">Enable</button> <button class="disable k-button">Disable</button>
        </li>
    </ul>
</div>
<form method="post">
    <div class="demo-section k-content">
        <%= Html.Kendo().Upload()
            .Name("files")
        %>
    </div>
</form>
<script>
    function getUpload() {
        return $("#files").data("kendoUpload");
    }

    $(document).ready(function() {
        $(".toggleEnabled").click(function() {
            getUpload().toggle();
        });

        $(".enable").click(function() {
            getUpload().enable();
        });

        $(".disable").click(function() {
            getUpload().disable();
        });
    });
</script>
</asp:Content>