using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>//here we need to soecify what we are goinf to return since we are not going to return from here we keep as if is
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.ActivityDto.Id], cancellationToken)
                            ?? throw new Exception("Cannot find activity");


            mapper.Map(request.ActivityDto, activity);

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("Failed to update the activity", 400);

            return Result<Unit>.Success(Unit.Value);

        }
    }
}
