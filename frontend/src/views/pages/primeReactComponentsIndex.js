import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Paginator } from 'primereact/paginator';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import { PickList } from 'primereact/picklist';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { FilterMatchMode } from 'primereact/api';
import { Chart } from 'primereact/chart';
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel';
import { TabView, TabPanel } from 'primereact/tabview';
import { RadioButton } from 'primereact/radiobutton';
import { Image } from 'primereact/image';
import { Tooltip } from 'primereact/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import _default from 'react-redux/es/components/connect';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Route, Routes, useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api';
import ReactDOMServer from 'react-dom/server';

const REACT_APP_GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const components = {
    ReactDOMServer,
    GoogleMap,
    LoadScript,
    InfoWindow,
    MarkerF,
    _default,
    Link,
    useParams,
    useNavigate,
    Route,
    Routes,
    useLocation,
    FullCalendar,
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    React,
    useRef,
    useState,
    useEffect,
    useMemo,
    moment,
    useNavigate,
    useDispatch,
    useSelector,
    Button,
    Carousel,
    Tooltip,
    TabView,
    RadioButton,
    Image,
    TabPanel,
    ProgressSpinner,
    PickList,
    Divider,
    Chart,
    FileUpload,
    InputTextarea,
    InputNumber,
    Password,
    Calendar,
    OverlayPanel,
    Column,
    DataTable,
    Dialog,
    Dropdown,
    InputText,
    MultiSelect,
    Paginator,
    Tag,
    Toast,
    Toolbar,
    FilterMatchMode,
    classNames,
    REACT_APP_GOOGLE_MAP_API_KEY
};
export default components;
