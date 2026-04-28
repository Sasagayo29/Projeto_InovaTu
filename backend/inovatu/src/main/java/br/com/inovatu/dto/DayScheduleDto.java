package br.com.inovatu.dto;

import java.util.List;

public record DayScheduleDto(
    String date,           
    List<String> morning,    
    List<String> afternoon   
) {}