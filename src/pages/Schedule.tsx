import React, { useEffect, useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import { CalendarApi } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSnackbar } from 'notistack';
import timeFormat from '@/utils/timeFormat';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent }  from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { Theme, useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';

import dayjs from 'dayjs';

interface event {
    title: string,
    start: Date,
    end: Date,
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


export function Schedule(prop) {
    const theme = useTheme();
    const { meetingRoomName = '' } = prop;
    const { enqueueSnackbar } = useSnackbar();
    const calendarRef = useRef<FullCalendar>(null)
    const [calendarApi, setCalendarApi] = useState<CalendarApi>();
    const [dataTitle, setDataTitle] = useState<string>('');
    const [events, setEvents] = useState<event[]>([]);
    const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
    const [dialogInfo, setDialogInfo] = React.useState<event | null>();

    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    useEffect(() => {
        const calendar = calendarRef.current;
        if (calendar) {
            const calendarApi = (calendar as FullCalendar).getApi();
            setCalendarApi(calendarApi);
            setDataTitle(getDate());
        }
    }, [calendarRef.current])

    function next() {
        if (calendarApi) {
            calendarApi.next();
            setDataTitle(getDate());
        }
    };

    function prev() {
        if (calendarApi) {
            calendarApi.prev();
            setDataTitle(getDate());
        }
    };

    function getDate() {
        if (!calendarApi) return ''
        const date = calendarApi.getDate()
        const timeFormat = (dayNum) => dayjs(date.toString()).add(dayNum, 'day').format('DD/MM/YYYY')
        return `${timeFormat(1)} ~ ${timeFormat(5)}`;
    };

    function selectAllow({ start }) {
        return !(start < dayjs());
    }

    function select(info) {
        console.log(info);
        const { start, end } = info;
        setDialogVisible(true);
        setDialogInfo(info);

        calendarApi!.addEvent({ id: 'temporaryId', title: 'Unnamed Meeting', start, end });
        // const { start, end } = info;
        // setEvents([
        //     ...events,
        //     { title: 'Unnamed Meeting', start, end }
        // ])
        // enqueueSnackbar('This is a success message!', { variant: 'success' });
        // alert('clicked ' + info.dateStr);
    }

    const handleClose = () => {
        setDialogVisible(false);
        calendarApi!.getEventById('temporaryId')?.remove()
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        console.log(event, formJson);
    }
 
    const getDialogTitle = () => {
        if (!dialogInfo) return 'Booking';
        return `Would you like to reserve meeting room ${meetingRoomName} for the time period from ${timeFormat(dialogInfo.start, 'HH:mm')} to ${timeFormat(dialogInfo.end, 'HH:mm')}?`
    }

    return (
        <>
            <div className="w-[96vw] h-[92vh] m-[2vw] my-[4vh] rounded-lg overflow-hidden bg-primary-content">
                <div className="p-[20px] h-[92vh] overflow-scroll">
                    <header className="h-[4vh] flex justify-between nowrap mb-[1vh]">
                        <button className="btn btn-outline btn-primary" onClick={prev}>Prev</button>
                        <p className="text-[33px] font-[700] text-primary">
                            { dataTitle }
                        </p>
                        <button className="btn btn-outline btn-primary" onClick={next}>Next</button>
                    </header>
                    <FullCalendar
                        ref={calendarRef}
                        height={'83vh'}
                        plugins={[ listPlugin, timeGridPlugin, interactionPlugin ]}
                        initialView="timeGridWeek"
                        headerToolbar={false}
                        hiddenDays={[ 0, 6 ]}
                        slotDuration='00:10:00'
                        slotMinTime='09:30:00'
                        slotMaxTime='21:30:00'
                        selectable={true}
                        selectMirror={true}
                        selectOverlap={false}
                        selectAllow={selectAllow}
                        select={select}
                    />
                    <Dialog
                        open={dialogVisible}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleSubmit,
                        }}
                    >
                        <DialogTitle>{ getDialogTitle() }</DialogTitle>
                        <DialogContent >
                        <Stack spacing={4}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="name"
                                label="Conference topic"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                id="members"
                                select
                                label="Select"
                                defaultValue="EUR"
                                helperText="Please select your currency"
                                variant="filled"
                                >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <FormControl id="members" fullWidth>
                                <InputLabel id="members">Participants</InputLabel>
                                <Select
                                    labelId="members"
                                    id="members"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Participants" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                        {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
} 