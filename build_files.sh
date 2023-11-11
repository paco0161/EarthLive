# Build the project
echo "Building the project"
python3.9 -m pip install -r requirements.txt

echo "Make migration"
python3.9 manage.py migrate

echo "Collect static"
python3.9 manage.py collectstatic --settings=EarthLive.settings.prod