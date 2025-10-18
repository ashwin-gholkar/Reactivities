using System;
using AutoMapper;
using Domain;

namespace Application.Activities.Queries;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
    }
}
