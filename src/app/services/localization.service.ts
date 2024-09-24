import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocalizationService {
    
    formats = [
        {
            fullLang: "Ukraininan (31.01.2000)",
            lang: "ua",
            value: "dd.MM.yyyy"
        },
        {
            fullLang: "USA (01-31-2000)",
            lang: "usa",
            value: "MM-dd-yyyy"
        },
        {
            fullLang: "UK (31/01/2000)",
            lang: "uk",
            value: "dd/MM/yyyy"
        }
    ];

    languages = [
        {
            label: "English",
            value: "en"
        },
        {
            label: "Ukraininan",
            value: 'uk'
        }
    ]

    timeZones = [
        { label: "UTC-11", value: -11, },
        { label: "UTC-10", value: -10, },
        { label: "UTC-9", value: -9, },
        { label: "UTC-8", value: -8, },
        { label: "UTC-7", value: -7, },
        { label: "UTC-6", value: -6, },
        { label: "UTC-5", value: -5, },
        { label: "UTC-4", value: -4, },
        { label: "UTC-3", value: -3, },
        { label: "UTC-2", value: -2, },
        { label: "UTC-1", value: -1, },
        { label: "UTC",   value:  0, },
        { label: "UTC+1", value:  1, },
        { label: "UTC+2", value:  2, },
        { label: "UTC+3", value:  3, },
        { label: "UTC+4", value:  4, },
        { label: "UTC+5", value:  5, },
        { label: "UTC+6", value:  6, },
        { label: "UTC+7", value:  7, },
        { label: "UTC+8", value:  8, },
        { label: "UTC+9", value:  9, },
        { label: "UTC+10", value: 10, },
        { label: "UTC+11", value: 11, },
        { label: "UTC+12", value: 12, },
        { label: "UTC+13", value: 13, },
        { label: "UTC+14", value: 14, },
    ]

    timeFormats = [
        {
            label: "12-hour (11:05 PM)",
            value: "12",
            format: "hh:mm a"
        },
        {
            label: "24-hour (23:05)",
            value: "24",
            format: "HH:mm"
        }
    ]

    currencies = ["$", "₴", "€", "£", "¥"]

    constructor(private translateService: TranslateService)
    {}

    setLanguage(lang: string) {
        this.translateService.use(lang);
        localStorage.setItem("language", lang)
    }

    setDefaultLanguage() {
        this.translateService.use(environment.defaultLocale)
        localStorage.setItem("language", environment.defaultLocale)
    }

    setCurrentDataFormat(type: string) {
        localStorage.setItem("dataformat", type);
    }

    setCurrentTimeZone(timezone: number) {
        localStorage.setItem("timezone", timezone.toString());
    }

    setCurrentTimeFormat(timeformat: string) {
        localStorage.setItem("timeformat", timeformat);
    }

    getCurrentLanguage() : string {
        var result : string | null = localStorage.getItem("language");
        if (result == null) {
            return environment.defaultLocale;
        }
        return result;
    }

    getCurrentDataFormatType() : string {
        var result = localStorage.getItem("dataformat");
        if(result == null) {
            return environment.defaultDateFormat;
        }
        return result;
    }
    
    getCurrentDataFormat() {
        var result = this.getCurrentDataFormatType();
        const format = this.formats.find(item => item.lang == result);
        return format
    }

    getCurrentTimeZone() : number {
        var result = localStorage.getItem("timezone");
        if(result == null)
            return environment.defaultTimeZone;
        return parseInt(result);
    }

    getCurrentTimeFormatType() : string {
        var result = localStorage.getItem("timeformat");
        if(result == null) {
            return environment.defaultTimeFormat;
        }
        return result;
    }

    getCurrentTimeFormat() {
        var result = this.getCurrentTimeFormatType();
        const format = this.timeFormats.find(item => item.value == result);
        return format
    }

    getCorrectLocalizedDateFormat() {
        return this.getCurrentDataFormat()?.value + " "
            + this.getCurrentTimeFormat()?.format;
    }

    getCorrectLocalizedDate(utcDate: Date | null | undefined) {
        if(utcDate == null || utcDate == undefined) {
            return null;
        }

        var newDate = new Date(utcDate);
        newDate.setHours(newDate.getHours() + this.getCurrentTimeZone());
        return newDate;
    }
}
