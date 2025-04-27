import uuid
from bs4 import BeautifulSoup

def convert_to_int(salary:str) -> int or None:
    """
        Helper function to convert salary into an int.

        Parameters
        --------------
        salary: `str`
            Salary for player
        
        Returns
        --------------
        salary_int: `int`
            Salary as integer, or None if no salary data provided.
    """
    salary_int = ''.join(filter(str.isdigit, salary))

    if(salary_int == ''):
        return None 

    return int(salary_int)


def transform_to_dict(html_string: str) -> dict:
    """
        Helper function to convert HTML string into a dictionary. Removes records without salary data.

        Parameters
        --------------
        html_string: `str`
            A string representation of an HTML document
        
        Returns
        --------------
        data: `dict`
            Dictionary containing:
                data: `list` of salary records parsed from the html string
    """
    data = {
        'data': []
    }
    # Parse html sring with BeautifulSoup
    soup = BeautifulSoup(html_string, 'html.parser')
    
    # Find all table rows, and iterate through them
    rows = soup.find_all('tr')
    for i in range(len(rows)):
        record = {}

        # Loop over all the cells in this row to create key:val pair in record
        for cell in rows[i].find_all('td'):
            column = cell['class'][0]
            text_content = cell.get_text()
            
            record[column] = text_content

        # Convert the salary to an int
        salary_int = convert_to_int(record['player-salary'])

        # Ignore recored if salary data missing ('' or 'no salary data')
        if(salary_int is None):
            continue
       
        # Add record to data
        record['id'] = uuid.uuid4()
        data['data'].append({**record, 'player-salary': salary_int})
    
    return data