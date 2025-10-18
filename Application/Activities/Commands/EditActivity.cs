using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest//here we need to soecify what we are goinf to return since we are not going to return from here we keep as if is
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Activity.Id], cancellationToken)
                            ?? throw new Exception("Cannot find activity");


            mapper.Map(request.Activity, activity);


            await dbContext.SaveChangesAsync(cancellationToken);

        }
    }
}
