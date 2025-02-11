# Citizen Action of New York Outreach Planning Calculator

This is a web-based tool that helps organize and plan outreach strategies for contacting people or turning out people to an event. The tool calculates the number of people you need to contact, broken down by different contact methods (phone banking, canvassing, tabling, etc.) while accounting for various success rates. It also includes a flake factor for event turnout, where a portion of RSVPs are expected to not show up.

## Features

1. **Contact People:**
   - Users can input how many people they want to contact.
   - The tool calculates a breakdown of how many people to contact per method (Phonebanking, Canvassing, Tabling, etc.), adjusting for each method’s success rate.
   - Option to filter by contact method (e.g., only Phonebanking, only Canvassing).

2. **Event Turnout:**
   - Users can input how many people they want to turnout for an event and the event date.
   - The tool calculates how many people need to be contacted, factoring in both success rates and the "flake factor" (only 50% of people who RSVP will likely show up).
   - Provides a suggested breakdown for the number of contacts per method needed to meet your turnout goal.

3. **Contact Method Success Rates:**
   - The tool accounts for the success rates of different outreach methods:
     - **Phonebanking:** 8% success rate
     - **Canvassing:** 15% success rate
     - **Tabling:** 25% success rate
     - **Street Canvassing:** 10% success rate

4. **Flexible User Interface:**
   - Easily switch between contacting people and turning out people for an event.
   - Optionally filter by contact method for specific calculations.

## Usage

1. **Contact People:**
   - Select the "Contact a Certain Number of People" option.
   - Enter the number of people you want to contact.
   - Optionally, filter by contact method (Phonebanking, Canvassing, Tabling, Street Canvassing).
   - The tool will provide a suggested breakdown of how many people to contact for each method, based on success rates.

2. **Event Turnout:**
   - Select the "Turnout People for an Event" option.
   - Enter the number of people you want to turnout and the event date.
   - The tool will calculate how many people need to be contacted, adjusting for the "flake factor" (50% no-show rate) and the success rates of each contact method.

## Example Outputs

### Contact a Certain Number of People:
- You want to contact 100 people.
- Suggested Breakdown:
  - **Phonebanking:** 125 people
  - **Canvassing:** 67 people
  - **Tabling:** 40 people
  - **Street Canvassing:** 100 people

### Event Turnout Plan:
- You want to turnout 12 people for your event on 2025-03-04.
- Suggested Breakdown:
  - **Phonebanking:** 50 people
  - **Canvassing:** 30 people
  - **Tabling:** 16 people
  - **Street Canvassing:** 20 people

## Development Setup

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kendog0429/citizen-action-outreach-calculator.git
   cd citizen-action-outreach-calculator